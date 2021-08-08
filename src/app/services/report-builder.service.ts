import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportBuilderService {

  constructor() { }

  getExpensesReport() {
    console.log('Calling expenses report');
  }
}
