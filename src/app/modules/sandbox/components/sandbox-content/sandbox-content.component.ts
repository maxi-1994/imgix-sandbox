import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox-content',
  templateUrl: './sandbox-content.component.html',
  styleUrls: ['./sandbox-content.component.scss']
})
export class SandboxContentComponent implements OnInit {
  public images: any;

  constructor(){}

  ngOnInit(): void {
  }
}
