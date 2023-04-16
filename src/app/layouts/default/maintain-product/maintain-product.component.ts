import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {FileService} from '../../../services/file.service';
import {Routed} from '../../../domain/routed';
import {Path} from '../../../domain/path';
import {ProductCategoryService} from '../../../services/product-category.service';
import {CardColorService} from '../../../services/card-color.service';
import {CardTypeService} from '../../../services/card-type.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-maintain-product',
  templateUrl: './maintain-product.component.html',
  styleUrls: ['./maintain-product.component.scss']
})
export class MaintainProductComponent extends Routed implements OnInit {
  path: Path = Path.MAINTAIN_PRODUCT;
  title = 'Edit product';
  productForm: FormGroup;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  productCategories: string[];
  cardColors: string[];
  cardTypes: string[];
  showCardFields = false;
  addAnother = false;

  constructor(
    private cardColorService: CardColorService,
    private cardTypeService: CardTypeService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeServices();
  }

  initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      description: [null],
      stock: [null, Validators.required],
      price: [null, Validators.required],
      fileGroupCode: [null],
      card: this.formBuilder.group({
        color: [null, Validators.required],
        type: [null, Validators.required],
        subtype: [null, Validators.required],
        manaCost: [null, Validators.required],
        set: [null, Validators.required],
        oracleText: [null, Validators.required],
        flavourText: [null, Validators.required],
        artist: [null, Validators.required],
        power: [null, Validators.required],
        toughness: [null, Validators.required],
        loyalty: [null, Validators.required],
      })
    });
    this.productForm.get('card').disable();
  }

  initializeServices(): void {
    this.productCategoryService.getProductCategories().subscribe(result => {
      this.productCategories = result;
    });

    this.cardColorService.getCardColors().subscribe(result => {
      this.cardColors = result;
    });

    this.cardTypeService.getCardTypes().subscribe(result => {
      this.cardTypes = result;
    });
  }

  onSubmit(): void {
    this.productService.addProduct(this.productForm.value).subscribe(() => {
      this.productForm.reset();
      this.resetFormSubject.next(true);

      if (!this.addAnother) {
        this.router.navigateByUrl('/' + Path.MANAGE_PRODUCTS);
      }
    });
  }

  updateProductFiles($event): void {
    this.productForm.patchValue({fileGroupCode: $event});
  }

  onChangeProductCategory(): void {
    if (this.productForm.get('category').value === 'Magic card') {
      this.productForm.get('card').enable();
      this.showCardFields = true;
    } else {
      this.showCardFields = false;
    }
  }
}
