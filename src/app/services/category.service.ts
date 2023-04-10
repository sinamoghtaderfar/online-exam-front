import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  // load all the categories

  public categories(){
    return this._http.get(`${baseUrl}/category/`);
  }
  // add new category
  public addCategory(category){
    return this._http.post(`${baseUrl}/category/`,category);
  }
  // delete category
  public deleteCategory(categoryId){
    return this._http.delete(`${baseUrl}/category/${categoryId}`);
  }
   //get single quiz
    public getCategory(cId){
    return this._http.get(`${baseUrl}/category/${cId}`);
  }
  // update category
  public updateCategory(category){
    return this._http.put(`${baseUrl}/category/`,category);
  }
}
