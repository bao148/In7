// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-product-category',
//   templateUrl: './admin-product-category.component.html',
//   styleUrls: ['./admin-product-category.component.css']
// })
// export class AdminProductCategoryComponent {
//   categories = [
//     { id: 1, name: 'Chairs' },
//     { id: 2, name: 'Tables' },
//     { id: 3, name: 'Sofas' }
//   ];

//   category = { id: null, name: '' };
//   editMode = false;

//   onSubmit() {
//     if (this.editMode) {
//       this.updateCategory();
//     } else {
//       this.addCategory();
//     }
//   }

//   addCategory() {
//     const newCategory = { ...this.category, id: Date.now() };
//     this.categories.push(newCategory);
//     this.resetForm();
//   }

//   onEdit(category) {
//     this.category = { ...category };
//     this.editMode = true;
//   }

//   updateCategory() {
//     const index = this.categories.findIndex(c => c.id === this.category.id);
//     if (index > -1) {
//       this.categories[index] = { ...this.category };
//       this.resetForm();
//     }
//   }

//   onDelete(category) {
//     this.categories = this.categories.filter(c => c.id !== category.id);
//   }

//   resetForm() {
//     this.category = { id: null, name: '' };
//     this.editMode = false;
//   }
// }
