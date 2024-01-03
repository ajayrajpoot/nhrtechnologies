import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { UsesService } from 'src/app/services/uses.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  usersList: any = [];

  displayedColumns: string[] = ['Position', 'Name', 'Email', 'Password', 'Gender', 'Role', 'Action'];
  dataSource: any = [];
  LoggedUser: any;


  constructor(private gbl: GlobalService,
    private userSrv: UsesService
  ) {

    this.getUsers();

    this.gbl.LoggedUser.subscribe((data: any) => {
      this.LoggedUser = data;
    })
  }

  redirect(url: string, p: any = null) {
    this.gbl.redirect(url, p);
  }

  getUsers() {
    try {

      this.userSrv.getUsers({}).subscribe(data => {
        // console.log(">>>", data);
        this.dataSource = data.User;
        // console.log("dataSource", this.dataSource)

      },
        error => {

          console.error(error.error.Message)
          this.gbl.errorNotification(error.error.Message || error.error || error.message || error);
        });
    } catch (error: any) {
      console.log("error--->", error)
      this.gbl.errorNotification(error.Message);

    }
  }

  delete(id: string) {

    try {

      if (!confirm('Are you sure to delete user ?')) {

        return;
      }
      this.userSrv.deleteUsers({ id: id }).subscribe(data => {
        if (data.Result) {
          this.gbl.successNotification(data.Message);
          this.getUsers();
        } else {
          this.gbl.errorNotification(data.Message);
        }

      },
        error => {

          console.error(error.error.Message)
          this.gbl.errorNotification(error.error.Message || error.error || error.message || error);
        });

    } catch (error: any) {
      this.gbl.errorNotification(error.message || error)
    }
  }

  logout() {
    localStorage.clear();
    this.redirect('login');
  }
}
