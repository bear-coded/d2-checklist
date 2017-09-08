import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ANIMATE_ON_ROUTE_ENTER } from '../../animations/router.transition';
import { BungieService } from "../../service/bungie.service";

@Component({
  selector: 'pgcr-history',
  templateUrl: './pgcr.component.html',
  styleUrls: ['./pgcr.component.scss']
})
export class PGCRComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  private unsubscribe$: Subject<void> = new Subject<void>();

  instanceId: string;
  data: any;
  loading: boolean = false;

  constructor(private bungieService: BungieService, private route: ActivatedRoute) {

  }

  private load() {
    console.log("Load");
    this.loading = true;
    this.bungieService.getPGCR(this.instanceId).then((res) => {
      this.data = res;
      this.loading = false;
    }).catch((x) => {
      this.loading = false;
    });
  }

  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.takeUntil(this.unsubscribe$).subscribe(params => {
      this.instanceId = params['instanceId'];
      this.load();
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
