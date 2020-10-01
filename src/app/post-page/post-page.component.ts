import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {PostService} from '../shared/services/post.service';
import {Post} from '../../environments/interface';
import {Subscription} from 'rxjs';
import {Constants} from '../../environments/constants';
import {Router} from '@angular/router';
import {AlertService} from '../shared/services/alert.service';
import {FormControl} from '@angular/forms';
import {ThemeService} from '../shared/services/theme.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less']
})
export class PostPageComponent implements OnInit, OnDestroy {
  public isHello = false;
  posts: Post[] = [];
  postSub: Subscription;
  deleteSub: Subscription;
  dir: string[];
  direction = Constants.dirArr;
  timeFilter = Constants.timeFilter;
  author: string;
  questCard: Post;
  editCardPost: Post;
  loadingFlag = true;
  isDes = true;
  arrowUpAndDown = 'arrow_upward';
  filters = new FormControl();
  commentFiltersValue: string[] = [];
  commentFilter: string[] = Constants.commentFilter;
  direFiltersValue: string[] = [];
  direct = new FormControl();
  timeSelect: string;
  displaySelect = 'Tiled';
  isDisplayTiled = true;
  selectedTheme = '';
  themeSub: Subscription;

  constructor(
    private themeService: ThemeService,
    public authService: AuthService,
    private postService: PostService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.postSub = this.postService.getData().subscribe(post => {
      this.author = this.authService.email;
      this.posts = post;
      this.displaySelect = this.themeService.getFromLocalStore('display_view') || this.displaySelect;
      this.reverseDisplay();
      this.loadingFlag = false;
    });
    // this.postService.createAdminData(Constants.adminEmail).subscribe();
    this.themeSub = this.themeService.selectTheme$
      .subscribe(item => this.selectedTheme = item);
  }

  getId(post: Post): void {
    this.questCard = post;
    this.router.navigate(['post', this.questCard.id]);
  }

  edit(post: Post, $event: Event): void {
    $event.stopPropagation();
    this.editCardPost = post;
    this.router.navigate(['post', this.editCardPost.id, 'edit']);
  }

  remove(id: string, $event): void {
    $event.stopPropagation();
    this.deleteSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning('The question has been deleted');
    });
  }

  sort(): void {
    this.isDes ? this.arrowUpAndDown = 'arrow_downward' : this.arrowUpAndDown = 'arrow_upward';
    this.isDes = !this.isDes;
  }

  addFilterArr(): void {
    this.commentFiltersValue = this.filters.value || [];
    this.direFiltersValue = this.direct.value || [];
  }

  reverseDisplay(): void {
    this.displaySelect === 'Tiled' ? this.isDisplayTiled = true : this.isDisplayTiled = false;
    this.themeService.setInLocalStore('display_view', this.displaySelect);
  }

  selectedThemeItem(): void {
    this.themeService.changeTheme(this.selectedTheme);
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
    if (this.themeSub) {
      this.themeSub.unsubscribe();
    }
  }


}
