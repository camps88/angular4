import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';
import { UploadEvent, UploadFile } from 'ngx-file-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'SpotIT';
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
  ngOnInit() {
  //  let userAvatarImage = this.auth.getUserAvatarImage();
  }

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    console.log(this.files);
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry;
        console.log(fileEntry);
    //    fileEntry.file((file: File) => {

          // Here you can access the real file
        //  console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

    //    });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }


}
