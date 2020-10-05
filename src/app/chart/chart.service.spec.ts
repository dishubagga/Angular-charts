import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ChartService } from "./chart.service";

describe("ChartService", () => {
  let httpMock: HttpTestingController;
  let service: ChartService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChartService],
    });
    service = TestBed.inject(ChartService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  describe("Methods", () => {
    describe("All Forms", () => {
      it("Checks the url", () => {
        service.getLineChartData().subscribe();
        const req = httpMock.expectOne(`http://127.0.0.1:5000/sourcedata`);
        expect(req.request.url).toBe(`http://127.0.0.1:5000/sourcedata`);
      });
    });
  });
});
