import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/user/user';

/**
 * Component displaying detailed information about the selected user from table.
 */
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  detailedUser?: User;
  id?: number;

  /**
   * Constructor for UserInfoComponent.
   * When triggered it takes argument from route and through service finds User by his id.
   * @param userService
   * @param router Used to navigate in app after closing this component.
   * @param route Route which led to this component. Used to retrieve 'id' parameter.
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.findUserById(params['id']).subscribe(user => {
        this.detailedUser = user;
        console.log(user);
      });
    });
  }

  ngOnInit(): void {
    this.userService.findUserById(this.id!).subscribe(user => {
      this.detailedUser = user;
    });
  }

  /**
   * Navigating with router to home page.
   * Triggered when backButton is clicked.
   */
  onBackClicked(): void {
    this.router.navigate([''], {replaceUrl: true});
  }
}
