export class QAFormsModel {

    IntervalID: Number = 0;
    IntervalName: String = '';
    JobFormID: Number = 0;
    JobFormName: String = '';
    JobFormTypeID: Number = 0;
    JobID: Number = 0;
    Status: String = '';
    SubmitDate: Date;
    Attachments: Array<Attachment> = [];
    isCollapsed: Boolean = false;
}

export class Attachment {
    name: String = '';
    url: any
}