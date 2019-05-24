import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { from, BehaviorSubject } from 'rxjs';
import { supportsScrollBehavior } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mArticles: Array<any>;
  mSources: Array<any>;

  constructor(private newsapi:NewsApiService) {
    console.log('app component constructor called');
  }

  ngOnInit() {

    //load articles
    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);

    //load news sources
    this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);

  }

  searchArticles(source) {
    console.log("Selected source is: "+source);
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);  
  }

  title = 'News Application';

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          document.getElementById("myBtn").style.display = "block";
      } else {
          document.getElementById("myBtn").style.display = "none";
      }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
      document.body.scrollTop = 0; // For Safari
      window.scrollTo({top: 0, behavior: 'smooth'});
  } 
}


