import { RoomError } from 'src/app/game/models/socket';
import { ErrorHandler, Injectable } from '@angular/core';
import { AlertService } from './services/alert.service';

export class CustomError extends Error {
  additionalErrorMessage: string | undefined;
  message: RoomError;
  constructor(message: RoomError, additionalErrorMessage?: string) {
    super(message);
    this.name = 'CustomError';
    this.additionalErrorMessage = additionalErrorMessage;
    this.message = message;
  }
}

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  constructor(private alertService: AlertService) {
    super();
  }
  handleError(error: any) {
    if (error instanceof CustomError) {
      this.alertService.openNewAlert(error.message, error.additionalErrorMessage);
    }
    super.handleError(error);
  }
}
