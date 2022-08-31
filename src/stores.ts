import { writable } from 'svelte/store';
import type Card from './card.svelte';

export const score = writable(0);
export const cards = writable<Card[]>([]);

export type Question = {
	target?: HTMLElement;
	correctAnswers: string[];
};

export const currentQuestion = writable<Question>({ correctAnswers: [] });
