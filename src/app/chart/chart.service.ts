import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer } from "rxjs";
import { BasicLineChartModel } from "../models/linechart.model";
import { switchMap } from "rxjs/operators";
@Injectable()
export class ChartService {
  private static readonly FIFTEEN_SECONDS: number = 15000;
  constructor(private httpClient: HttpClient) { }
  private _fetchDataFromServer(): Observable<BasicLineChartModel[]> {
    return this.httpClient.get<BasicLineChartModel[]>(
      "http://0.0.0.0:3000/sourcedata"
    );
  }
  getLineChartData(): Observable<BasicLineChartModel[]> {
    return timer(0, ChartService.FIFTEEN_SECONDS).pipe(
      switchMap(() => this._fetchDataFromServer())
    );
  }
}
