import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // public myForms2 = new FormGroup ({
  //   favoriteGames: new FormArray([])
  // });

  public myForm: FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['MeatlGear',Validators.required],
      ['MarioGame',Validators.required],
      ]),

  })

  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  constructor(private fb: FormBuilder){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
    // return this.myForm.controls['favoriteGames'];
  }

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  isValidFieldinArray(formArray:FormArray, i:number){
    return formArray.controls[i].errors &&
    formArray.controls[i].touched
  }

  getFieldError(field:string):string | null{
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {}; //si no viene regresa vacio
    for (const key of Object.keys(errors)){
      switch(key){
        case 'required':
        return 'Este campo es requerido';
        case 'minlength':
        return `Minimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }


  onDeleteFavorite(i:number):void{
    this.favoriteGames.removeAt(i);
  }

  addToFavorite():void{
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    console.log(this.newFavorite.value);
    this.favoriteGames.push( this.fb.control(newGame, Validators.required))
    this.newFavorite.reset();
  }

  onSubmit():void{
    if(this.myForm.invalid) {// aqui verifico si es valido el form
      this.myForm.markAllAsTouched(); // marca a todos los campos como tocados
      return;
    }
    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();

  }

}
