import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IImagePreviewContent} from '@app/shared/common/image-preview/type';

@Injectable({
  providedIn: 'root',
})
export class ImagePreviewService {
  public toggleModal = new BehaviorSubject<{
    isOpen: boolean;
    images?: string[];
    currentIndex?: number;
  }>({isOpen: false});
  public modalContent = new BehaviorSubject<IImagePreviewContent>({});

  constructor() {}

  openModal(modalContent: IImagePreviewContent): void {
    this.toggleModal.next({
      isOpen: true,
      images: modalContent.images,
      currentIndex: modalContent?.currentIndex,
    });
    this.modalContent.next(modalContent);
  }

  closeModal(): void {
    this.toggleModal.next({
      isOpen: false,
      images: [],
      currentIndex: 0,
    });
    this.modalContent.next({});
  }
}
