import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { string } from 'mathjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() options: { name: string, route: string }[] = [];
  @Input() icon: string = 'info';
  @Output() selectedOption = new EventEmitter<string>();
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu: ElementRef | undefined;

  isOpen = false;
private clickListener!: () => void;


  constructor(private renderer: Renderer2, private elementRef: ElementRef, private authService: AuthenticationService ) {}

  ngOnInit() {
    this.clickListener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => {
        this.adjustDropdownPosition();
      }, 0);
    }
  }

  selectOption(name: string) {
    if(name === 'Sign Out') {
      this.authService.signOut();
    }
    this.isOpen = false;
  }

  adjustDropdownPosition() {
    if (this.dropdownMenu) {
      const rect = this.dropdownMenu.nativeElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (rect.right > windowWidth) {
        this.renderer.setStyle(this.dropdownMenu.nativeElement, 'left', `-${rect.width - this.dropdownMenu.nativeElement.parentElement.offsetWidth}px`);
      } else {
        this.renderer.setStyle(this.dropdownMenu.nativeElement, 'left', '0');
      }

      if (rect.bottom > windowHeight) {
        this.renderer.setStyle(this.dropdownMenu.nativeElement, 'top', `-${rect.height}px`);
      } else {
        this.renderer.setStyle(this.dropdownMenu.nativeElement, 'top', `${this.dropdownMenu.nativeElement.parentElement.offsetHeight}px`);
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isOpen) {
      this.adjustDropdownPosition();
    }
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}