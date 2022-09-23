import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

detailedUser?: User;
id?: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.findUserById(params['id']).subscribe(user => {
        this.detailedUser = user;
      });
    });

    console.log(this.id);
  }

  ngOnInit(): void {
    this.userService.findUserById(this.id!).subscribe(user => {
      this.detailedUser = user;
    });
  }

  onBackClicked(): void {
    this.router.navigate(['']);
  }
}
