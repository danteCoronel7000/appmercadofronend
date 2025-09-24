import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

export interface CarData {
  id: number;
  source: string;
  sourceIcon: string;
  timeAgo: string;
  title: string;
  year: number;
  image: string;
  likes: number;
  dislikes: number;
  comments: number;
}
@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export default class Cards {
  cars: CarData[] = [
    {
      id: 1,
      source: 'motor1.com',
      sourceIcon: 'https://via.placeholder.com/20x20/3B82F6/FFFFFF?text=M1',
      timeAgo: '6d',
      title: 'Crítica: Chevrolet Trailblazer',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop',
      likes: 11,
      dislikes: 0,
      comments: 0
    },
    {
      id: 2,
      source: 'autoguide.com',
      sourceIcon: 'https://via.placeholder.com/20x20/10B981/FFFFFF?text=AG',
      timeAgo: '3d',
      title: 'Review: Ford Explorer Sport',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop',
      likes: 24,
      dislikes: 2,
      comments: 5
    },
    {
      id: 3,
      source: 'carreview.net',
      sourceIcon: 'https://via.placeholder.com/20x20/F59E0B/FFFFFF?text=CR',
      timeAgo: '1d',
      title: 'Test Drive: Toyota Highlander Hybrid',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop',
      likes: 18,
      dislikes: 1,
      comments: 12
    },
    {
      id: 4,
      source: 'autoblog.com',
      sourceIcon: 'https://via.placeholder.com/20x20/EF4444/FFFFFF?text=AB',
      timeAgo: '5h',
      title: 'Primera Impresión: Honda Pilot Elite',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1494976688153-ca3c31c049fc?w=400&h=250&fit=crop',
      likes: 32,
      dislikes: 3,
      comments: 8
    },
    {
      id: 5,
      source: 'roadtest.es',
      sourceIcon: 'https://via.placeholder.com/20x20/8B5CF6/FFFFFF?text=RT',
      timeAgo: '2d',
      title: 'Análisis Completo: Mazda CX-9 Signature',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1580414562827-e64822e743fb?w=400&h=250&fit=crop',
      likes: 15,
      dislikes: 0,
      comments: 6
    },
    {
      id: 6,
      source: 'carmag.com',
      sourceIcon: 'https://via.placeholder.com/20x20/06B6D4/FFFFFF?text=CM',
      timeAgo: '4d',
      title: 'Prueba Extensiva: Jeep Grand Cherokee L',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
      likes: 28,
      dislikes: 5,
      comments: 15
    }
  ];

  showDropdown: { [key: number]: boolean } = {};

  toggleDropdown(carId: number) {
    this.showDropdown[carId] = !this.showDropdown[carId];
  }

  closeDropdown(carId: number) {
    this.showDropdown[carId] = false;
  }

  onCardAction(action: string, car: CarData) {
    console.log(`Action: ${action} on car:`, car.title);
    // Aquí puedes implementar las acciones específicas
  }
}
