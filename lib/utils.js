import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getPagination(data, page = 1, itemsPerPage = 80, maxPageNumbers = 5) {
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const currentPage = Math.max(1, Math.min(page, totalPages));
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const pageData = data.slice(startIndex, endIndex);
	const prevPage = Math.max(1, currentPage - 1);
	const nextPage = Math.min(currentPage + 1, totalPages);
	const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPageNumbers / 2), totalPages - maxPageNumbers + 1));
	const pageNumbers = Array.from({ length: Math.min(maxPageNumbers, totalPages - startPage + 1) }, (_, i) => startPage + i);
	return { totalPages, currentPage, pageData, prevPage, nextPage, isPageOutOfRange: page > totalPages, pageNumbers };
}
