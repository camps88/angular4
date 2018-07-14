import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private apiService: ApiService,
              private _DomSanitizer: DomSanitizer,
              private spinner: NgxSpinnerService) { }

  showHome: boolean;
  showResults: boolean;
  filtered: boolean;
  hideResults: boolean;
  checkboxEbay: boolean;
  checkboxAmazon: boolean;


  ngOnInit() {
    this.spinner.show();
    this.showHome = true;
    this.showResults = false;
    this.filtered = false;
    this.hideResults = false;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

  }
  data: any = {};
  dataFiltered: any = {};
  user: any;
  webLinks = [];
  webLinksFiltered = [];
  results = {};
  filters = [];
  filteredResults = {};
  image: any;
  favorite: boolean = false;
  state: any;
  isWebImage: boolean = false;
  showCamera: boolean = true;
  cmImage: any;


  dropFile (event) {
    console.log(event);
    console.log(event.dataTransfer.files);
    event.preventDefault();
    let dropZone = document.getElementById('dropzone');
    dropZone.className = 'dropzone';
    this.encodeFile(event);
  }

  dragOver(event){
    let dropZone = document.getElementById('dropzone');
    dropZone.className = 'dropzone dragover';
    event.stopPropagation();
    event.preventDefault();
  }

  encodeFile(event) {
    this.isWebImage = true;
    this.showCamera = false;
    let reader = new FileReader();
    console.log('entra en encode');
    if(event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      let file = event.dataTransfer.files[0];
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.cmImage = reader.result.split(',')[1];
        let imageUploaded = { imageBase64 : reader.result.split(',')[1] };
        console.log(imageUploaded);
        this.uploadImage(imageUploaded);
      }
    }
  }

  hideView () {
    this.showHome = false;
    this.showResults = false;
    this.showCamera = true;
  }

  hideViewCamera () {
    this.showHome = true;
    this.showResults = false;
    this.showCamera = false;
  }

  uploadImage(imageUploaded) {
    this.showHome = false;
    this.showResults = true;
    this.image = imageUploaded;
    this.apiService.uploadImage(imageUploaded).subscribe(data => {
        this.data = data;
        console.log(this.data);
        let items = this.data.image.items;
        if (items !== undefined) {
          for (let i=0; i < items.length; i++) {
              if (items[i] !== undefined && items[i].pagemap) {
                let titleShorted = items[i].title.slice(0,25) + '...';
                console.log(titleShorted);
                this.results = {
                  title: titleShorted,
                  shopLink: items[i].displayLink,
                  webLink: items[i].link,
                  imageLink: items[i].pagemap.cse_image[0].src,
                }
                this.webLinks.push(this.results);
                console.log(this.webLinks);
              }
          }
        this.success = true;
        }else {
          console.warn('No results available to show!');
        }
    );
  }

  public triggerSnapshot(): void {
      this.trigger.next();
      this.showCamera = false;
      this.webLinks = [];
      this.isWebImage = false;
    }

  public toggleWebcam(): void {
    this.showHome = !this.showHome;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    console.info('received webcam image', webcamImage);
    console.warn(webcamImage.imageAsBase64);
    let cameraImage = { imageBase64 : webcamImage.imageAsBase64};
    this.uploadImage(cameraImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  applyFilters(event) {
    console.log(event.target.value);
    if (event.target.checked) {
        this.filters.push(event.target.value);
    }else {
      if (event.target.value === 'amazon') {
        this.filters.push('ebay');
      }else {
        this.filters.push('amazon');
      }
    }
    if (this.filters.length > 1) {
      this.filters=[];
    }
    console.log(this.filters);
  }

  getResults() {
    this.webLinks = [];
    // this.webLinksFiltered = [];
    if (this.filters.length < 1) {
      this.uploadImage(this.image);
    }else {
      this.filtered = true;
      console.log(this.filters);
      this.apiService.sendFilters(this.filters, this.data.idImage).subscribe(result => {
          this.dataFiltered = result;
          console.log(this.dataFiltered);
          let itemsFiltered = this.dataFiltered.items;
          for (let i=0; i < itemsFiltered.length; i++) {
              if (itemsFiltered[i].pagemap) {
                let titleShorted2 = itemsFiltered[i].title.slice(0,25) + '...';
                console.log(titleShorted2);
                this.filteredResults = {
                  title: titleShorted2,
                  shopLink: itemsFiltered[i].displayLink,
                  webLink: itemsFiltered[i].link,
                  imageLink: itemsFiltered[i].pagemap.cse_image[0].src,
                }
                this.webLinks.push(this.filteredResults);
                console.log(this.webLinksFiltered);
              }
          }
        });
    }
  }

  setFavorite (event) {
    console.warn(event);
    if (document.getElementById('favorite')) {
      this.favorite = false;
    }else {
      this.favorite = true;
    }
    this.apiService.setFavorite(this.data.idImage).subscribe(data => {
      console.log(data);
      this.state = data;
    });
  }


}
