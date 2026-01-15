import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-input-drag-drop-file',
  templateUrl: './input-drag-drop-file.component.html',
  styleUrls: ['./input-drag-drop-file.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class InputDragDropFileComponent implements OnInit, OnDestroy {
  @Input() immediateUpload?: boolean = false;
  @Input() accept?: string;
  @Input() multiple: boolean = false;
  @Input() disabled?: boolean;
  @Input() width?: string;
  @Input() height?: string;
  @Input() class?: string;
  @Input() loading?: boolean;
  @Input() sizeMb: number = 5;
  @Input() typeFile: 'document' | 'image' | 'video' | 'audio' | 'all' =
    'document';

  @Output() fileChange = new EventEmitter<File[] | undefined>();

  @ViewChild('fileInput') fileInput!: ElementRef;

  public files: File[] = []; // Không dùng ?, và mặc định là mảng rỗng

  constructor(private readonly toastr: ToastrService) {}

  ngOnInit(): void {}

  getFiles(event: any): void {
    const files = [...event.target.files] as File[];
    let error = false;

    if (this.sizeMb) {
      files?.forEach((file: File) => {
        if (file.size > this.sizeMb * 1024 * 1024) {
          this.toastr.warning(`File không vượt quá ${this.sizeMb}MB`, 'Chú ý');
          error = true;
          return;
        }
        const validTypes: {
          [key in 'document' | 'image' | 'video' | 'audio' | 'all']: string[];
        } = {
          image: ['image/jpeg', 'image/png', 'image/jpg'],
          document: ['application/pdf', 'application/doc', 'application/docx'],
          video: ['video/mp4', 'video/webm'],
          audio: ['audio/mpeg', 'audio/wav'],
          all: [],
        };
        const fileType = file.type || '';
        const allowedTypes: string[] =
          validTypes[this.typeFile] || validTypes.all;

        if (this.typeFile !== 'all' && !allowedTypes.includes(fileType)) {
          this.toastr.error(
            `Chỉ chấp nhận định dạng ${this.accept || 'hợp lệ'}`,
            'Lỗi',
          );
          error = true;
          return;
        }
      });
    }

    if (error) {
      this.fileInput.nativeElement.value = '';
      return;
    }

    this.files = files;
    this.fileChange.emit(this.files);
    console.log('Files emitted:', this.files);

    if (this.immediateUpload) {
      this.files = [];
      this.fileInput.nativeElement.value = '';
    }
  }

  handleClickInput() {
    this.fileInput.nativeElement.click();
  }

  handleClear(): void {
    this.files = [];
    this.fileInput.nativeElement.value = '';
    this.fileChange.emit(undefined);
    this.toastr.info('Đã xóa file', 'Thông báo');
  }

  handleSave(): void {
    if (this.files.length > 0) {
      this.fileChange.emit(this.files);
      this.toastr.success('Lưu file thành công', 'Thông báo');
    } else {
      this.toastr.error('Không có file để lưu', 'Lỗi');
    }
  }

  ngOnDestroy(): void {}
}
