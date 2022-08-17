import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../service/feedback.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {
  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Function: Create feedback (User send feedback)
   */
  currentDate = new Date();
  rating: number[] = [1, 2, 3, 4, 5];
  value: number = 0;
  feedbackFrom: FormGroup;
  selectedImage: any = null;
  isLoading: Boolean = false;

  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Constructor
   * @param feedbackService
   * @param angularFireStorage
   * @param toastrService
   */
  constructor(private feedbackService: FeedbackService,
              private angularFireStorage: AngularFireStorage,
              private toastrService: ToastrService) {
    this.getFeedbackForm();
  }

  ngOnInit(): void {
    this.getFeedbackForm();
  }

  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Function: Get value of "rating" from Feedback Form
   * @param rating
   */
  getValue(rating: number) {
    this.value = rating;
  }

  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Date updated: 12-14/08/2022
   * Function: Get Feedback Form with validation for form-controls
   */
  getFeedbackForm() {
    this.feedbackFrom = new FormGroup({
      creator: new FormControl("",
        [Validators.required, Validators.minLength(2), Validators.maxLength(30),
          Validators.pattern("^([A-ZÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẬẪÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]" +
            "[a-záàảãạăắằẳẵặâấầẩậẫéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]*( )){0,14}" +
            "([A-ZÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẬẪÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]" +
            "[a-záàảãạăắằẳẵặâấầẩậẫéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]*)$")]),
      email: new FormControl("", [Validators.required, Validators.email,
        Validators.minLength(5)]),
      content: new FormControl("", [Validators.required, Validators.minLength(2)]),
      rating: new FormControl( this.value),
      image: new FormControl("",
        [Validators.pattern("^.+((.jpg)|(.png)|(.gif)|(.jpeg)|(.psd)|(.bmp)|(.heic)|(webp))$")])
    })
  }

  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Date updated: 12-14/08/2022
   * Function: Actions when user click button "Gửi phản hồi"
   */
  save() {
    if (this.feedbackFrom.valid) {
      this.toggleLoading();
      const imgName = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.angularFireStorage.ref(imgName);
      const feedback = this.feedbackFrom.value;
      feedback.rating = this.value;

      this.angularFireStorage.upload(imgName, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            feedback.image = url;
            this.feedbackService.createFeedback(feedback).subscribe(
              () => {
                this.showToastrSuccess();
                this.feedbackFrom.reset();
                this.value = 0;
                //@ts-ignore
                $('#staticBackdrop').modal('hide');
              }, error => {
                console.log(error.error);
                let errs = error.error;
              })
          })
        })
      ).subscribe();
    } else {
      this.showToastrWarning();
    }
  }

  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Function: Get current date-time to concatenate with image name
   */
  private getCurrentDateTime(): string {
    return formatDate(new Date(), 'ddMMyyyy_hh:mm:ssa_', 'en-US');
  }

  /**
   * Created by: DiepTT
   * Date created: 11/08/2022
   * Function: Get information of uploaded image
   * @param event
   */
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  /**
   * Created by: DiepTT
   * Date created: 13/08/2022
   * Function: Get information of uploaded image
   */
  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  showToastrSuccess() {
    this.toastrService.success('Cảm ơn quý khách đã gửi phản hồi về cho quán!', 'Gửi thành công.');
  }
  showToastrWarning(){
    this.toastrService.warning("Vui lòng nhập đầy đủ thông tin!")
  }
}
