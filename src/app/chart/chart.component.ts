import { Component, OnInit } from "@angular/core";
import { EChartOption } from "echarts";
import { Subscription } from "rxjs";
import { ChartService } from "./chart.service";
import { BasicLineChartModel } from "../models/linechart.model";
@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  providers: [ChartService],
})
export class ChartComponent implements OnInit {
  static readonly GRID_SETTINGS: any = {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  };
  private _subscription: Subscription;
  // private _gotSeries: BasicLineChartModel[] = [];
  _chartOption: EChartOption;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getLineChartData().subscribe((data) => {
      // this._gotSeries = data as BasicLineChartModel[];
      console.log(data);
      this._initLineChart(data);
    });
  }

  private _createSeriesArrayFrom(chartData: BasicLineChartModel[]): any {
    return chartData.map((el) => {
      return { name: el.name, type: el.type, data: el.data };
    });
  }

  private _initLineChart(chartData: BasicLineChartModel[]): void {
    this._chartOption = {
      title: {
        text: "Line chart",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: chartData.map((el) => {
          return el.xname;
        }),
      },
      grid: ChartComponent.GRID_SETTINGS,
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: chartData.map((el) => {
          return el.xname;
        }),
      },
      yAxis: {
        type: "value",
      },
      series: this._createSeriesArrayFrom(chartData),
    };
  }
}
