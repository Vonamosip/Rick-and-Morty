import { Component, DestroyRef, ElementRef, EventEmitter, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, fromEvent, Subject, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzMenuModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();

  // public searchHistory$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public searchHistory$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    searchControl: FormControl = new FormControl<string>('', {
      nonNullable: true,})

  public isCollapsed = false;

  public historySignal = signal<string[]>([]);

  constructor(private readonly destroyRef:DestroyRef){}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value) => {
      this.search.emit(value);
      this.historySignal.update((history) => {
        if (history.includes(value)) {
          return history;
        }
        return [...history, value];
      })
    })
  }

  public clearHistory(): void {
    this.historySignal.update(() => []);
    this.search.emit('');
  }

  // public searchByName(searchResult: string): WritableSignal<string[]> {
  //   public searchByName(searchResult: string): void {
  //   let time1 = performance.now();

  //   let time2 = performance.now();
  //   console.log('Execution time:', time2 - time1, 'milliseconds');

  //   this.search.emit(searchResult);
  //   return this.historySignal;
  // }

  // public searchByName(searchResult:string): void {
  //   let time1 = performance.now();
  //   const currentHistory = this.searchHistory$.getValue();
  //   if (!currentHistory.includes(searchResult)) {
  //     this.searchHistory$.next([...currentHistory, searchResult]);
  //   }

  //   this.search.emit(searchResult);
  //   this.isCollapsed = true;
  //   let time2 = performance.now();
  //   console.log('Execution time:', time2 - time1, 'milliseconds');
  // }

  // public clearHistory(): void {
  //   this.searchHistory$.next([]);
  //   this.searchInput.nativeElement.value = '';
  //   this.search.emit('');
  // }

}

