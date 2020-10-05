import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EChartOption } from "echarts";
import { ChartService } from "../chart.service";
import { BasicLineChartModel } from "src/app/models/linechart.model";

@Component({
  selector: "app-linear-chart",
  templateUrl: "./linear-chart.component.html",
  styleUrls: ["./linear-chart.component.css"],
  providers: [ChartService],
})
export class LinearChartComponent implements OnInit {
  static readonly GRID_SETTINGS: any = {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  };
  // private _subscription: Subscription;
  _chartOption: EChartOption;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getLineChartData().subscribe((data) => {
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
          return el.xPathName;
        }),
      },
      grid: LinearChartComponent.GRID_SETTINGS,
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: chartData.map((el) => {
          return el.xPathName;
        }),
      },
      yAxis: {
        type: "value",
      },
      series: this._createSeriesArrayFrom(chartData),
    };
  }
}
