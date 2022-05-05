import { Component } from '@angular/core';
import { File } from './models/file';
import { Type } from './models/type';
import { User } from './models/user';
import { FileService } from './services/file.service';
import { TypeService } from './services/type.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isUsersLoading: boolean = false;
  users: User[] = [];
  files: File[] = [];
  types: Type[] = [];
  displayedColumnsUsers: string[] = ['id', 'givenName', 'familyName'];
  displayedColumnsFiles: string[] = [
    'status',
    'modifiedBy',
    'type',
    'scheduled',
    'title',
    'createdBy',
  ];
  displayedColumnsTypes: string[] = [
    'creationDateTime',
    'id',
    'documentsCount',
    'description',
    'name',
    'colourId',
  ];

  constructor(
    private userService: UserService,
    private typeService: TypeService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTypes();
    this.getFiles();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  getTypes(): void {
    this.typeService.getTypes().subscribe((data: Type[]) => {
      this.types = data;
    });
  }

  getFiles(): void {
    this.isUsersLoading = true;
    this.fileService.getFiles().subscribe((data: File[]) => {
      this.files = data;
      this.userService.getUsers().subscribe((users: User[]) => {
        this.files.map((file) => {
          let creator: User | undefined;
          creator = users.find((item) => item.id === file.createdBy);

          if (creator) {
            file.createdBy = `${creator.givenName} ${creator.familyName}`;
          }

          let modifier: User | undefined;
          modifier = users.find((item) => item.id === file.modifiedBy);

          if (modifier) {
            file.modifiedBy = `${modifier.givenName} ${modifier.familyName}`;
          }
        });

        this.typeService.getTypes().subscribe((types: Type[]) => {
          this.files.map((file) => {
            let fileType: Type | undefined;
            fileType = types.find((item) => item.id === file.type);
            if (fileType) {
              file.type = fileType?.name;
            }
          });

          this.files.sort((a, b) => {
            if (a.type > b.type) {
              return 1;
            } else if (a.type < b.type) {
              return -1;
            } else {
              return 0;
            }
          });
          this.isUsersLoading = false;
        });
      });
    });
  }
}
