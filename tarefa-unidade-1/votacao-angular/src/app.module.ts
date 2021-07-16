import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Button, Result, VoteList } from './components';

@NgModule({
  declarations: [
    Button,
    Result,
    VoteList
  ],
  imports: [
    BrowserModule
  ],
})
export class AppModule { }
