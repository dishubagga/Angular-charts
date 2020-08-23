import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer } from "rxjs";
import { BasicLineChartModel } from "../models/linechart.model";
import { switchMap, map } from "rxjs/operators";
@Injectable()
export class ChartService {
  private static readonly FIFTEEN_SECONDS: number = 15000;
  constructor(private httpClient: HttpClient) {}
  private fetchDataFromServer(): Observable<BasicLineChartModel[]> {
    return this.httpClient.get<BasicLineChartModel[]>(
      "/assets/chart/line-chart-data.json"
    );
  }
  getLineChartData(): Observable<BasicLineChartModel[]> {
    return timer(0, ChartService.FIFTEEN_SECONDS).pipe(
      switchMap(() => this.fetchDataFromServer())
    );
  }
}