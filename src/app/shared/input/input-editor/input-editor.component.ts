import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CKEditorComponent, CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CommonModule} from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from '../../../../assets/custom-editor/ckeditor';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-editor',
  standalone: true,
  imports: [CKEditorModule, CommonModule, FormsModule],
  templateUrl: './input-editor.component.html',
  styleUrl: './input-editor.component.scss',
})
export class InputEditorComponent {
  @ViewChild('editor') editorComponent?: CKEditorComponent;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  public Editor = Editor.Editor;
  public config = {
    allowedContent: 'p b a i em strong',
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
          class: true,
        },
      ],
    },
    sanitizer: {
      allowedTags: ['p', 'a', 'strong', 'em', 'span', 'div', 'img', 'b'],
      allowedAttributes: {
        p: ['style'],
        a: ['href', 'target'],
        img: ['src', 'alt'],
        span: ['id', 'class'],
      },
    },
    keystrokes: [[13, 'doNothing']],
    autoParagraph: false,
    placeholder: 'Type the content here!',
    extraAllowedContent: 'elementWithAttribute[*]',
    allowAttributes: ['id', 'class'],
  };

  constructor() {}

  onChange({editor, event}: {editor: ClassicEditor; event: any}): void {
    this.valueChange.emit(this.value);
  }

  onReady(eventData: any) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (
      loader: any,
    ) {
      return new UploadAdapter(loader);
    };
  }
}

export class UploadAdapter {
  private loader;
  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          let myReader = new FileReader();
          myReader.onloadend = (e) => {
            resolve({default: myReader.result});
          };
          myReader.readAsDataURL(file);
        }),
    );
  }
}
