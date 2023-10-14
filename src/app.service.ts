import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';
import { report } from 'process';


interface DataProps {
  amount: number
  source: string
}
interface UpdateDataProps {
  amount?: number
  source?: string
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException(
        'Invalid report type. Accepted types are: income, expense',
      );
    }
    return data.report.filter((report) => report.type === type).map(report => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException(
        'Invalid report type. Accepted types are: income, expense',
      );
    }

    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) {
      throw new NotFoundException(`Report with id ${id} not found.`);
    }
    // return report;
    return new ReportResponseDto(report); 
  }

  createReport(type: ReportType, { amount, source} : DataProps): ReportResponseDto{
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException(
        'Invalid report type. Accepted types are: income, expense',
      );
    }
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, id: string, body : UpdateDataProps):ReportResponseDto{
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) {
      throw new NotFoundException(`Report with id ${id} not found.`);
    }
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    ); 

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string){

   const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex !== -1) {
      data.report.splice(reportIndex, 1);
    } else {
      throw new NotFoundException(`Report with id ${id} not found.`);
    }
      
  }
}
