import { TemplateRef, Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private modalRefList: BsModalRef[] = [];
    private currentModalRef: BsModalRef;

    private _confirmMessage: Subject<Options> = new Subject<Options>();
    public confirmMessage: Observable<Options> = this._confirmMessage.asObservable();
    private _confirmResult: Subject<boolean> = new Subject<boolean>();
    public confirmResult: Observable<boolean> = this._confirmResult.asObservable();

    constructor(private modalService: BsModalService) { }

    show(template: TemplateRef<any> | any, cssClass: string = '', param?: any): Observable<any> {

        const initialState = {
            paramFromParent: param
        };

        let modalRef = this.modalService.show(template, { class: cssClass, initialState });
        this.modalRefList.push(modalRef);

        return new Observable<any>(this.getConfirmSubscriber(this.modalService, modalRef));
    }

    confirm(message: string, header: string = '', trueButtonLabel: string = '', falseButtonLabel: string = ''): Observable<boolean> {
        this._confirmMessage.next({ message: message, header: header, state: State["modal-block-primary"], falseButtonLabel: falseButtonLabel, trueButtonLabel: trueButtonLabel });
        return new Observable<boolean>(this.getConfirmResult());
    }

    info(message: string, header: string = ''): Observable<boolean> {
        this._confirmMessage.next({ message: message, header: header, state: State["modal-block-info"] });
        return new Observable<boolean>(this.getConfirmResult());
    }

    success(message: string, header: string = ''): Observable<boolean> {
        this._confirmMessage.next({ message: message, header: header, state: State["modal-block-success"] });
        return new Observable<boolean>(this.getConfirmResult());
    }

    warn(message: string, header: string = ''): Observable<boolean> {
        this._confirmMessage.next({ message: message, header: header, state: State["modal-block-warning"] });
        return new Observable<boolean>(this.getConfirmResult());
    }

    error(message: string, header: string = ''): Observable<boolean> {
        this._confirmMessage.next({ message: message, header: header, state: State["modal-block-danger"] });
        return new Observable<boolean>(this.getConfirmResult());
    }

    hide(result?: any) {
        this.currentModalRef = this.modalRefList.pop();
        this.currentModalRef.content = result;
        this.currentModalRef.hide();
    }

    closeConfirm(isYes: boolean = false) {
        this._confirmResult.next(isYes);
    }

    private getConfirmSubscriber(modalService, modalRef) {
        return (observer) => {
            const subscription = modalService.onHidden.subscribe(() => {
                observer.next(modalRef.content);
                observer.complete(modalRef.content = null);
            });

            return {
                unsubscribe() {
                    subscription.unsubscribe();
                }
            };
        }
    }

    private getConfirmResult() {
        return (observer) => {
            const subscription = this.confirmResult.subscribe((result: boolean) => {
                observer.next(result);
                observer.complete();
            });

            return {
                unsubscribe() {
                    subscription.unsubscribe();
                }
            };
        }
    }
}


export class Options {
    header: string = '';
    message: string = '';
    state: State;
    trueButtonLabel?: string;
    falseButtonLabel?: string;
}

export enum State {
    //'modal-block-primary' = 1,
    'modal-block-info' = 2,
    'modal-block-success' = 3,
    'modal-block-warning' = 4,
    'modal-block-danger' = 5,
    'modal-block-primary' = 6
}

export enum Icon {
    ///'fa-question-circle' = State["modal-block-primary"],
    'fa-info-circle' = State["modal-block-info"],
    'fa-check' = State["modal-block-success"],
    'fa-exclamation-triangle' = State["modal-block-warning"],
    'fa-times-circle' = State["modal-block-danger"],
    'fa-question-circle' = State["modal-block-primary"]
}
