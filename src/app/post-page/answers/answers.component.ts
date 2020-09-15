import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Answers, Post} from '../../../environments/interface';
import {Subscription} from 'rxjs';
import {PostService} from '../../shared/services/post.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AlertService} from '../../shared/services/alert.service';
import {switchMap} from "rxjs/operators";


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.less']
})
export class AnswersComponent implements OnInit, OnDestroy {
  form: FormGroup;
  authorOnline: string;
  card: Post;
  answers: Answers[] = [];
  postSub: Subscription;
  answersSub: Subscription;
  isLoaded = false;
  correct = false;
  submitted = false;
  id = this.router.url.slice(1);
  // @input

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private rout: ActivatedRoute,
    private alert: AlertService //
  ) { }

  ngOnInit(): void {
    this.authorOnline = this.authService.email;
    this.postSub = this.rout.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params.id);
        })
      ).subscribe(post => { //
      this.card = post;
      if (post.answers) {
        this.answers = post.answers.sort((a, b) => {
            if (a.correct === true) {
              return -1;
            }
            else {
              return 1;
            }
        });
      }
      this.isLoaded = true;
    });
    this.form = new FormGroup({
      text: new FormControl()
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const answer: Answers = {
      id: this.id, //
      author: this.authorOnline,
      text: this.form.value.text,
      date: new Date().getTime(),
      correct: this.correct,
    };
    this.answers.push(answer);
    this.answersSub = this.postService.update({
      ...this.card,
      answers: this.answers
    }).subscribe(() => {
      this.submitted = false;
      this.form.reset();
      this.alert.success('Comment left');
    });
  }

  changeFlag(answer: Answers): void {
    this.answers.map((a) => {
        if (a === answer) {
          a.correct = !a.correct;
        }
    });
    this.answersSub = this.postService.update({
      ...this.card,
      answers: this.answers
    }).subscribe(() => {
      this.submitted = false;
      this.form.reset();
      this.alert.success('Comment correct');
    });
    this.postSub = this.rout.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params.id);
        })
      ).subscribe(post => {
      this.card = post;
      if (post.answers) {
        this.answers = post.answers.sort((a, b) => {
          return a.correct ? -1 : 1;
        });
      }
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.answersSub) {
      this.answersSub.unsubscribe();
    }
  }
}
