import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public total_p1: number;
  public total_p2: number;
  public nota_p1: number;

  public total_questao: number;
  public qtd_alternativas: number;
  public qtd_alternativas_certas: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {

  }

  ngOnInit() {
  }

  public goTo(url: string){
    this.router.navigate([url], { relativeTo: this.route });
  }


}

