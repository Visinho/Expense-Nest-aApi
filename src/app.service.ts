import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';


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
  getAllReports(type: ReportType) {
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException(
        'Invalid report type. Accepted types are: income, expense',
      );
    }
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
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
    return report;
  }

  createReport(type: ReportType, { amount, source} : DataProps){
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
    return newReport;
  }

  updateReport(type: ReportType, id: string, body : UpdateDataProps){
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
    return data.report[reportIndex];
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
