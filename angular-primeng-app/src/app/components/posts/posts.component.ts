import { Component, OnInit, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe, CardModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts$!: Observable<Post[]>;
  private router = inject(Router);
  private blogService = inject(BlogService);

	ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
		this.posts$ = this.blogService.getPosts(this.blogURL);
	}

  navigateToPost(slug: string) {
    this.router.navigate(['/post', slug]);
  }
}
