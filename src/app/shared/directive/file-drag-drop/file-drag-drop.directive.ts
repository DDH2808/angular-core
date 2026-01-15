import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[fileDragDrop]',
})
export class FileDragNDropDirective {
  @Input() private allowed_extensions: Array<string> = []; // 'png', 'jpg', 'bmp'
  @Output() private filesChangeEmiter: EventEmitter<File[]> =
    new EventEmitter();
  @HostBinding('class') private class = 'file-drag-drop';
  @HostBinding('style.background') private background = '#fff';
  @HostBinding('style.border') private borderStyle = '';
  @HostBinding('style.border-radius') private borderRadius = '5px';

  constructor() {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.class = 'file-drag-drop dragging';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff';
    this.borderStyle = 'none';
    this.class = 'file-drag-drop';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff';
    this.class = 'file-drag-drop';
    // check if the file is valid
    if (evt.dataTransfer.items.length > 0) {
      let valid_files: Array<File> = [];
      for (let i = 0; i < evt.dataTransfer.items.length; i++) {
        if (evt.dataTransfer.items[i].kind === 'file') {
          let file = evt.dataTransfer.items[i].getAsFile();
          if (file) {
            let file_extension = file.name.split('.').pop();
            if (file_extension) {
              if (
                (this.allowed_extensions?.length &&
                  this.allowed_extensions.includes(file_extension)) ||
                !this.allowed_extensions?.length
              ) {
                valid_files.push(file);
              }
            }
          }
        }
      }
      this.filesChangeEmiter.emit(valid_files);
    } else if (evt.dataTransfer.files.length > 0) {
      let valid_files: Array<File> = [];
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        let file = evt.dataTransfer.files[i];
        if (file) {
          let file_extension = file.name.split('.').pop();
          if (file_extension) {
            if (
              (this.allowed_extensions?.length &&
                this.allowed_extensions.includes(file_extension)) ||
              !this.allowed_extensions?.length
            ) {
              valid_files.push(file);
            }
          }
        }
      }
      this.filesChangeEmiter.emit(valid_files);
    }
  }
}
