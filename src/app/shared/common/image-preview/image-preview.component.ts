import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {ImagePreviewService} from '@app/shared/common/image-preview/image-preview.service';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss',
})
export class ImagePreviewComponent implements OnInit, OnDestroy {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 39) {
      this.incrementIndex();
    }
    if (event.keyCode === 37) {
      this.deIncrementIndex();
    }
  }

  @ViewChild('template', {static: true}) template!: TemplateRef<any>;

  public images: string[] = [];

  public indexImage: number = 0;

  private destroy$ = new Subject();

  protected modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private imagePreviewService: ImagePreviewService,
  ) {}

  ngOnInit(): void {
    this.imagePreviewService.toggleModal
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((data) => {
        const {isOpen, images, currentIndex} = data;
        if (isOpen) {
          this.indexImage = currentIndex || 0;
          this.images = images || [];
          this.openModal();
        }
      });

    this.modalService.onHide.subscribe(() => {
      this.imagePreviewService.closeModal();
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template, {
      class: 'modal-image-preview',
      backdrop: false,
      ignoreBackdropClick: true,
    });
  }

  hideModal() {
    this.imagePreviewService.closeModal();
    this.modalRef?.hide();
  }
  incrementIndex() {
    if (this.indexImage < this.images.length - 1) {
      this.indexImage++;
    } else {
      this.indexImage = 0;
    }
  }
  deIncrementIndex() {
    if (this.indexImage > 0) {
      this.indexImage--;
    } else {
      this.indexImage = this.images.length - 1;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
