import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
const activityIconPairs = [
	{
		activityTypes: ['cycling', 'VirtualRide'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M4 13.01a3.5 3.5 0 003.46-3h1.08a3.5 3.5 0 102.42-3.84L9.83 4.01H11a.5.5 0 01.5.5h1a1.5 1.5 0 00-1.5-1.5H8.17l1.05 2h-3.1l-.532-1h.982l-.53-1H3.05l.53 1h.879l.747 1.407-.376.693a3.5 3.5 0 10-.83 6.9zm6.52-5.51l1.32 2.51h1.13l-1.54-2.93a2.12 2.12 0 01.57-.07 2.5 2.5 0 11-2.233 1.372c.178-.35.436-.652.753-.882zm-.78-1.49l.31.6a3.452 3.452 0 00-1.51 2.4h-.291l-1.6-3H9.74zm-3.972.463L7.117 9.01H4.4l1.368-2.537zM4 7.01c.11 0 .221.01.33.03L3.22 9.1l.47.91h2.76a2.5 2.5 0 11-2.45-3z" fill=""></path></svg>'
	},
	{
		activityTypes: ['EBikeRide'],
		icon: '<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M16 2.5v-1h-1V1h-1a2 2 0 00-1.93 1.5H2A1.5 1.5 0 00.5 4v2.99A1.523 1.523 0 002 8.5h1.9a3.5 3.5 0 103.545 4H8.54a3.5 3.5 0 102.42-3.85L9.83 6.5H11a.5.5 0 01.5.5h1A1.5 1.5 0 0011 5.5H8.17l1.05 2H6.127l-.527-1h.98l-.54-1H3.05l.53 1h.884L5 7.5H2.009a.517.517 0 01-.51-.51V4a.5.5 0 01.5-.5h10.072A2 2 0 0014 5h1v-.5h1v-1h-1v-1zM4 14.49a2.5 2.5 0 010-5c.11.002.221.012.33.028L3.22 11.59l.48.91h2.747A2.5 2.5 0 014 14.49zm.4-2.99l1.368-2.546L7.122 11.5zM12 9.49a2.5 2.5 0 11-2.233 1.372 2.47 2.47 0 01.753-.882l1.32 2.51h1.13l-1.54-2.93a2.12 2.12 0 01.57-.07zM7.02 8.5h2.72l.31.59a3.44 3.44 0 00-1.51 2.41h-.286l-1.595-3zm-2.19.09l-.006.01a3.492 3.492 0 00-.708-.1h.764z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Run', 'running', 'VirtualRun'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M6.03 13.29a7.45 7.45 0 005.28 2.21h2.19a2 2 0 00.3-3.98L9.96 4.33a1.747 1.747 0 00-2.443-.653c-.274.17-.495.414-.637.703l-.27.56a.873.873 0 01-.33-.8V2.17A1.3 1.3 0 004.97.75a1.433 1.433 0 00-1.34.93L2.16 4.67l-.95.7A1.819 1.819 0 00.5 6.74a1.942 1.942 0 00.6 1.53l4.93 5.02zM1.79 6.18l.4-.3 5.14 5.07h1.42l-5.77-5.7L4.54 2.1a.475.475 0 01.43-.35c.15 0 .31.04.31.42v1.97c0 1.13.63 1.87 1.61 1.87h.31l.58-1.19a.729.729 0 011.29-.02l.63 1.17-1.26.67v1.14l1.73-.92.41.78-1.34.71v1.14l1.82-.96.39.74-1.56.83v1.14l2.03-1.09 1.12 2.09.16.26h.3a1 1 0 010 2h-2.19a6.492 6.492 0 01-4.57-1.91L1.79 7.55a.96.96 0 01-.29-.75.87.87 0 01.29-.62z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Walk'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill=""><path d="M7.5 11.5h-2v1h2z"></path><path d="M15 8.06a1.646 1.646 0 00-1.22-.56h-1.41L7.65 4.99l-.42-.7a1.65 1.65 0 00-2.97.33l-.13.4A1.478 1.478 0 003 4.5 1.5 1.5 0 001.5 6v3.59A1.5 1.5 0 00.5 11 1.45 1.45 0 002 12.5h2.5v-1H2a.452.452 0 01-.5-.5.5.5 0 01.5-.5h5.5v-1h-5V6a.5.5 0 011 0v.5h1.19l.52-1.56a.668.668 0 011.16-.13l.57.94.65.35-.58 1.09.88.47.58-1.1.95.51-.58 1.09.88.47.58-1.09.95.5-.59 1.1.88.47.59-1.11h1.65a.644.644 0 01.48.23.84.84 0 01.22.56.959.959 0 01-.28.69l-.49.47a3.718 3.718 0 01-2.21 1.02v1.01a4.736 4.736 0 002.9-1.31l.5-.47c.37-.376.579-.882.58-1.41 0-.456-.17-.895-.48-1.23z"></path><path d="M10.5 11.5h-2v1h2z"></path></g></svg>'
	},
	{
		activityTypes: ['Hike'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M5.75 12.88l.24-.24a.329.329 0 01.46-.01l.24.25a2.18 2.18 0 001.5.62h1.63l-.72-1h-.91a1.13 1.13 0 01-.79-.33l-.24-.24a1.315 1.315 0 00-1.87 0l-.24.24c-.213.21-.5.328-.8.33h-.06l-.72 1h.78a2.119 2.119 0 001.5-.62z" fill=""></path><path d="M2.24 13.49l.72-.99h-.58a.876.876 0 01-.88-.88 5.98 5.98 0 01.1-1.12h2.8l.72-1H1.78v-.02l.15-.7a1.52 1.52 0 01.74-.99L6.5 5.65V4.51L2.29 6.86l.21-1.09a1.462 1.462 0 01.72-.99l2.12-1.17.38-.76a.567.567 0 01.5-.31A1.287 1.287 0 017.5 3.82V7.9l1 .53V6.9c.033.03.07.053.11.07l.89.47v1.52l1 .54V7.98l1 .53v1.52l1 .53V9.04l.37.2h1.12a.512.512 0 01.51.51 2.747 2.747 0 01-2.75 2.75h-1.42l.72 1h.7a3.751 3.751 0 003.75-3.75 1.515 1.515 0 00-1.51-1.51h-.87L9.08 6.09a1.084 1.084 0 01-.58-.96V3.82a2.285 2.285 0 00-2.28-2.28 1.543 1.543 0 00-1.39.86l-.25.49-1.84 1.02a2.43 2.43 0 00-1.22 1.67l-.87 4.45c-.1.524-.15 1.056-.15 1.59a1.87 1.87 0 001.74 1.87z" fill=""></path></svg>'
	},
	{
		activityTypes: ['RockClimbing'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M.5 9.654A2.452 2.452 0 002.949 12.1c.387 0 .77-.073 1.129-.217a5.447 5.447 0 012.036-.392H6.4c.54 0 1.08.063 1.606.187l5.65 1.339a1.5 1.5 0 001.848-1.46 4.2 4.2 0 00-1.58-3.3L7.939 3.47a1.366 1.366 0 00-1.995.41L5.05 5.563a.675.675 0 01-.6.358h-.204l-.512-.96.412-.494a1.158 1.158 0 10-1.913-.2l.286.536-.019.021a6.784 6.784 0 00-2 4.83zM2.949 11.1A1.45 1.45 0 011.5 9.654a5.8 5.8 0 01.164-1.306l1.456 2.739c-.057.005-.113.013-.171.013zm11.551.458a.5.5 0 01-.613.485l-5.651-1.335a7.988 7.988 0 00-1.549-.2l-.625-1.174 8.412 1.992c.006.079.026.155.026.235zm-1.2-2.511c.394.319.708.726.915 1.189L11.522 9.6l.968-1.2zm-1.59-1.271l-1.267 1.568-1.5-.354 1.667-2.1zM9.831 6.269L7.869 8.735l-1.514-.359L8.748 5.4zm-3.9-.237l.894-1.683a.332.332 0 01.486-.1l.655.524-2.605 3.243-.6-1.136a1.657 1.657 0 001.172-.848zM3.12 3.645a.154.154 0 01.219-.05.159.159 0 01.038.232l-.15.18-.111-.207a.152.152 0 01.004-.155zm-.106 2.09l.029.056.6 1.131 1.913 3.6c-.493.044-.98.144-1.45.3L2.123 7.081c.233-.488.533-.94.891-1.346z" fill=""></path></svg>'
	},
	{
		activityTypes: ['IceSkate'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M.5 13.409A2.093 2.093 0 002.591 15.5h10.991a1.918 1.918 0 001.366-3.265l-.748-.765a1.507 1.507 0 001.25-1.48V8.82a1.5 1.5 0 00-1.05-1.44l-2.24-.71-4.09-2.2-.5-2.97a1.2 1.2 0 00-1.18-1H5.5a1.192 1.192 0 00-1.13.82L3.64 3.5H2.37l.4-2H1.75L.84 6A16.9 16.9 0 00.5 9.4a2.089 2.089 0 00.948 1.748L.76 12.4c-.17.31-.26.656-.26 1.009zM5.32 1.63a.183.183 0 01.18-.13h.89a.193.193 0 01.19.17l.31 1.83h-2.2l.63-1.87zM1.58 7.79l3.2 1.71h2.11L1.73 6.73c.02-.178.05-.355.09-.53l.34-1.7h4.9l.03.17-.79 1.47.88.47.62-1.15 1.44.77-.62 1.16.88.47.63-1.16 1.43.77-.62 1.17.88.47.69-1.29 1.58.51a.513.513 0 01.36.49v1.17a.512.512 0 01-.51.51H2.6a1.1 1.1 0 01-1.1-1.1c0-.54.03-1.07.08-1.61zm8.92 3.71v.5a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-.5h5zm-8.864 1.383L2.4 11.49c.1.017.139.01 2.1.01v.5A1.5 1.5 0 006 13.5h4a1.5 1.5 0 001.5-1.5v-.5h1.319l1.417 1.437a.92.92 0 01-.654 1.563H2.591a1.09 1.09 0 01-.955-1.617z" fill=""></path></svg>'
	},
	{
		activityTypes: ['InlineSkate'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g clip-path="url(#sports_inline_skate_normal_xsmall_svg__clip0_138_638)" fill=""><path d="M2 16a2 2 0 100-4 2 2 0 000 4zm0-3a1 1 0 110 2.001A1 1 0 012 13z"></path><path d="M6 16a2 2 0 100-4 2 2 0 000 4zm0-3a1 1 0 110 2.001A1 1 0 016 13z"></path><path d="M10 16a2 2 0 100-4 2 2 0 000 4zm0-3a1 1 0 110 2.002A1 1 0 0110 13z"></path><path d="M14 16a2 2 0 100-4 2 2 0 000 4zm0-3a1 1 0 110 2.002A1 1 0 0114 13zM1.08 10.62a2.462 2.462 0 001.89.88h9.49a2.037 2.037 0 00.97-3.83L7.54 4.51V4.5h-.03l-.24-.13.41-2.2A1.409 1.409 0 006.3.5H4.74l-.66 1H1.77L.54 8.61a2.442 2.442 0 00.54 2.01zm11.87-2.07a1.029 1.029 0 01.244 1.644 1.046 1.046 0 01-.734.306h-1.881l1.308-2.521 1.063.571zm-11.43.23L2.61 2.5h2l.67-1H6.3a.366.366 0 01.31.15.376.376 0 01.09.33L6.225 4.5H4v1h3.268l1.132.606L7.16 8.5h1.12l1-1.921 1.72.926-1.553 3H2.97a1.47 1.47 0 01-1.416-1.087 1.507 1.507 0 01-.034-.638z"></path></g><defs><clipPath id="sports_inline_skate_normal_xsmall_svg__clip0_138_638"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>'
	},
	{
		activityTypes: ['AlpineSki', 'BackcountrySki', 'NordicSki', 'RollerSki'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M5.3 15.5l2.2-4.171L9.7 15.5h3.13L9.05 8.39l2.52-4.79a3.974 3.974 0 00.07-3.6h-1.23L7.5 5.48 4.59 0H3.36a3.973 3.973 0 00.07 3.6l2.52 4.79-3.782 7.11zm5.67-14.41a3.029 3.029 0 01-.28 2.04l-2.21 4.2-.41-.79zM4.31 3.13a3.028 3.028 0 01-.28-2.04l7.14 13.41h-.87zm2.207 6.323l.417.8L4.7 14.5h-.868z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Canoe', 'Kayaking'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill=""><path d="M8.48 10.08V8.87l-1 .53v.68a.5.5 0 101 0z"></path><path d="M5.52 10.44c.035.713.226 1.41.56 2.04l1.35 2.54h1.14l1.35-2.54a4.97 4.97 0 00.58-2.33V7.79l-1 .54v1.82a4 4 0 01-.46 1.86L8 13.96l-1.04-1.95a4 4 0 01-.46-1.86v-.23z"></path><path d="M.5 12.88l2.63-1.39c.238-.133.443-.318.6-.54l.5-.94.01-.01 4.24-2.25v-.01l3.45-1.83.06.03c.032.02.063.044.09.07.267.243.61.384.97.4.2 0 .399-.044.58-.13l1.89-1.01V2.08l-2.63 1.4a1.7 1.7 0 00-.59.54l-.42.79h-.01v.01l-1.39.73a4.788 4.788 0 00-.57-2.02L8.5 1H7.49L6.08 3.51a5.034 5.034 0 00-.58 2.34V8.2L3.99 9a.176.176 0 01-.05-.04 1.378 1.378 0 00-1.55-.27L.5 9.7zm12.64-8.32a.833.833 0 01.22-.2l1.16-.61v.92l-1.34.71c-.14.07-.21.05-.42-.11zM6.5 5.85a4 4 0 01.46-1.86L8 2.15l1.03 1.86c.31.575.471 1.217.47 1.87v.19l-1.02.55v-.7a.5.5 0 10-1 0v1.23l-.98.52zm-5 4.45l1.34-.72c.14-.06.21-.04.42.12l-.38.71a.574.574 0 01-.22.19l-1.16.62z"></path></g></svg>'
	},
	{
		activityTypes: ['WeightTraining', 'strength', 'Crossfit'],
		icon: '<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M14.5 5.5h-2v-2h-3v4h-3v-4h-3v2h-2v2H0v1h1.5v2h2v2h3v-4h3v4h3v-2h2v-2H16v-1h-1.5zm-11 4h-1v-3h1zm2-1v3h-1v-7h1zm6 2v1h-1v-7h1zm2-2v1h-1v-3h1z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Elliptical', 'Workout'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M15 3.5h-3.187a1.767 1.767 0 00-1.564.94s-.79 1.537-.83 1.56a.112.112 0 01-.12 0c-.04-.025-2.383-4.483-2.383-4.483a1.1 1.1 0 00-1.873 0L4.2 3.092a.772.772 0 01-.682.41H1.01v1h2.51a1.772 1.772 0 001.566-.94s.8-1.552.836-1.574a.1.1 0 01.107 0c.036.021 2.384 4.483 2.384 4.483a1.07 1.07 0 001.888 0l.83-1.563a.77.77 0 01.68-.409H15V3.5z" fill=""></path><path d="M15 7.488h-3.188a1.767 1.767 0 00-1.564.94s-.79 1.538-.831 1.562a.107.107 0 01-.121 0C9.255 9.966 6.91 5.506 6.91 5.506a1.1 1.1 0 00-1.873 0L4.2 7.08a.769.769 0 01-.681.41H1.008v1H3.52a1.767 1.767 0 001.564-.94s.8-1.552.837-1.574a.1.1 0 01.107 0C6.064 6 8.413 10.46 8.413 10.46a1.07 1.07 0 001.887 0l.83-1.56a.77.77 0 01.682-.409H15V7.488z" fill=""></path><path d="M10.248 12.443s-.79 1.537-.831 1.562a.111.111 0 01-.121 0C9.255 13.98 6.91 9.521 6.91 9.521a1.1 1.1 0 00-1.873 0L4.2 11.1a.77.77 0 01-.681.409H1.008v1H3.52a1.766 1.766 0 001.564-.94s.8-1.552.837-1.573a.1.1 0 01.107 0c.036.021 2.385 4.483 2.385 4.483a1.068 1.068 0 001.887 0l.83-1.563a.77.77 0 01.682-.409H15v-1h-3.188a1.768 1.768 0 00-1.564.936z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Soccer'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M3.54 9l-.78-.85H.81l.75.85h2-.02zm1.2 1.33L4 9.48H2l.75.85h2-.01zm6.94-4.83a3.78 3.78 0 00-2.41.86l-.1.08.41.95.18-.16a2.79 2.79 0 011.92-.75 2.84 2.84 0 01.51 5.64v-.66a1.78 1.78 0 00-1.11-1.64L10 9.47 8.05 5.22a1.13 1.13 0 00-.83-.62 1.16 1.16 0 00-1 .31l-.56.56-.14-.14V3.21a1.3 1.3 0 00-.36-.9l-.71-.76L1.2 5a1.33 1.33 0 00-.71 2.15l.51.52h1.33l-1.1-1.2a.35.35 0 01-.07-.24.26.26 0 01.19-.23.28.28 0 01.3 0l4.42 4.88V9.44L2.39 5.38l-.09-.1L4.46 3a.31.31 0 01.06.19v2.54l1.13 1.19 1.29-1.29a.12.12 0 01.11 0 .15.15 0 01.09 0l.21.48-1.08 1v1.36l1.51-1.38.22.48-1.15 1V10l1.58-1.46.78 1.76 1.52.46a.76.76 0 01.45.7v.68H6.34l-1.17-1.33h-2l.75.85h.72l.57.63v1.52h1v-.7h.5v.69h1v-.69h.54v.68h1v-.68h.55v.68h.93v-.67h.49v.67h1v-.69a3.82 3.82 0 00-.51-7.6h-.03z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Handcycle'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M2.51 6.5a2 2 0 100 4 2 2 0 000-4zm0 3a1 1 0 110-2 1 1 0 010 2zM7 9.5h3.56l.627-1.076.284.151a2.03 2.03 0 10.229-1.013L9.13 6.2a.878.878 0 00-1.688-.254.885.885 0 001.21 1.132l1.655.878-.317.544H7a.593.593 0 01-.51-.3L5.07 5.5H3.94l1.67 3.16A1.566 1.566 0 007 9.5zm6.49-2.03a1.015 1.015 0 11-1.02 1.02 1.022 1.022 0 011.02-1.02zM8.14 6.28a.12.12 0 01.12-.11.111.111 0 01.11.11c0 .13-.23.13-.23 0z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Rowing'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M12.56 3.64L14.16.5h-3.31L9.64 2.82a4.378 4.378 0 00-.52 2l-1.1 2.06L6.91 4.8a4.446 4.446 0 00-.51-1.98L5.18.5h-3.3l1.6 3.14A3.258 3.258 0 006.1 5.42l1.35 2.54-1.88 3.54H4.5v1h.53L3.17 16H4.3l1.86-3.5h.873v-1H6.7l1.32-2.48 1.31 2.48h-.3v1h.84l1.86 3.5h1.14l-1.86-3.5h.515v-1H10.47L8.58 7.95l1.35-2.53a3.29 3.29 0 002.63-1.78zm-2.04-.35l.94-1.79h1.06l-.85 1.68a2.327 2.327 0 01-1.51 1.2 3.5 3.5 0 01.36-1.09zm-6.15-.11L3.51 1.5h1.06l.94 1.79c.18.341.3.71.36 1.09a2.31 2.31 0 01-1.5-1.2z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Sail', 'Windsurf'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M10.13 1.74L9.48.5H7.66l-5.24 9.86 6.51 3.02-.6 1.12H2.24l-.53 1h11.76l.53-1H9.47l.66-1.24a12.24 12.24 0 000-11.52zM8.26 1.5h.62l.37.71c.219.417.41.848.574 1.29H7.2zm-1.59 3h3.483c.182.654.305 1.324.367 2H5.61zm-1.6 3h5.5c0 .67-.06 1.34-.18 2H4.01zm4.33 5l-4.31-2h5.07a11.573 11.573 0 01-.76 2z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Snowboard'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.823.812A2.6 2.6 0 008.2 2.092L7.034 4.837A27.157 27.157 0 014.82 9l-1.606 2.473A2.606 2.606 0 107.8 13.91l1.16-2.729a27.129 27.129 0 012.214-4.162l1.612-2.489a2.606 2.606 0 00-.963-3.718zm.123 3.173l-1.614 2.49a28.277 28.277 0 00-2.294 4.315l-1.16 2.73a1.606 1.606 0 11-2.825-1.5l1.605-2.476a28.094 28.094 0 002.3-4.315l1.164-2.746a1.605 1.605 0 112.824 1.5v.002z" fill=""></path></svg>'
	},
	{
		activityTypes: ['StairStepper'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M12.84 5.65v3.22l-.11-.07-1.13-.35L9.7 4.2a1.12 1.12 0 00-1.81-.3l-.56.56-.15-.15V2.19a1.29 1.29 0 00-.35-.9L6.12.54 2.86 4a1.31 1.31 0 00-.71 2.17h1.38l-.64-.71a.3.3 0 01-.08-.23A.29.29 0 013.3 5l.37-.33L3.3 5l1 1.13.24.27 1.38 1.52.25.28 1.32 1.45V8.16l-3.44-3.8-.05-.1L6.12 2a.31.31 0 01.06.19v2.52l1.13 1.18L8.6 4.6a.1.1 0 01.11 0 .12.12 0 01.09 0l.35.79-.89.82v1.38l1.32-1.22.32.73L9 8v1.32l1.38-1.26.54 1.22 1.51.46a.75.75 0 01.46.7v.68L8 11.09l-.39-.43H6.26l1 1.05v3.93h1v-3.55h5.63V5.65h-1.05zM6 8.92H4.68l.67.74H6.7L6 8.92zM4.44 7.16H3.09l.69.76h1.35l-.69-.76z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Surfing'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M5.433 6.142c-2.343 4.405-2.482 6.736-2.486 6.834l-.026.524h2.16l1.21 1.794.424-.332c.075-.06 1.869-1.5 4.208-5.9 2.418-4.547 1.7-7.272 1.264-8.25L12 .446l-.4.069C10.549.7 7.84 1.611 5.433 6.142zm4.607 2.45A23.162 23.162 0 016.49 13.8l-.564-.836 5.643-10.608c.166 1.214.045 3.277-1.53 6.236zm.66-6.727L5.04 12.5H4.023a21.7 21.7 0 012.293-5.889C7.885 3.657 9.562 2.4 10.7 1.865z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Velomobile'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M.73 7.31l2.85-1.58a2.024 2.024 0 001.89 1.39c.087-.002.174-.008.26-.02l2.51-.32 2.93-.18a5.209 5.209 0 013.06.79.553.553 0 01.06.91c-.59.478-1.32.749-2.08.77a1.951 1.951 0 00-1.71-1 2.013 2.013 0 00-1.74 1H2.4l-.45-1.31-.89.5.63 1.81h.824a1.992 1.992 0 103.984 0h2a2 2 0 003.99-.01v-.01a4.473 4.473 0 002.42-.96 1.549 1.549 0 00.372-2.011 1.6 1.6 0 00-.582-.579 6.2 6.2 0 00-3.59-.9l-2.64.16-.11-.21a2.829 2.829 0 00-2.49-1.5 5.066 5.066 0 00-2.44.63L.39 6.33l.34.98zm3.776 3.744a.993.993 0 01-.99-.984H5.5a.993.993 0 01-.994.984zm5.994 0a.99.99 0 11.99-.99.994.994 0 01-.99.986v.004zm-4.63-6a1.761 1.761 0 011.51.83L5.6 6.11a.965.965 0 01-.77-.24.982.982 0 01-.33-.57 3.739 3.739 0 011.37-.25v.004z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Yoga'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.68 12.13a1.59 1.59 0 01-.74-.13l-.16-.08-5.284-2.6-.006.01a1.79 1.79 0 01-1-1.51A2.11 2.11 0 012.3 5.67a1.8 1.8 0 011.186.207L4.8 6.51l4.72-2.07 5.97 2.99v1.263L8.46 12a1.81 1.81 0 01-.78.13zM5.97 7.07L9.45 5.5l5 2.5L8 11a.77.77 0 01-.34.08.8.8 0 01-.35-.063l-.091-.044a1.001 1.001 0 01-.409-.663l1.19.6.24-.15A1.54 1.54 0 009 9a1.42 1.42 0 00-.81-.91L5.97 7.07zm1.964 2.04a.398.398 0 00-.273-.04c-.188.03-.363.147-.5.28l.79.4a.48.48 0 00.12-.44.471.471 0 00-.137-.2zM2.887 6.7l3.728 1.79a1.91 1.91 0 00-.785 1.47 1.64 1.64 0 000 .23c0 .039.003.077.005.115L1.995 8.45 2 8.44a.78.78 0 01-.46-.67 1.11 1.11 0 01.92-1.12.91.91 0 01.427.05z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Golf'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M14 2.73l-.81 2.49h-3a3.78 3.78 0 00-5.76 0H2.36A1.61 1.61 0 001 6a1.63 1.63 0 00-.1 1.59l2.46 5.62h8.35l3.38-10.48H14zM6 5.22a2.73 2.73 0 012.6 0 2.92 2.92 0 011.09 1c.283.45.435.969.44 1.5a2.781 2.781 0 01-.56 1.66 2.79 2.79 0 01-4.26.34 1.81 1.81 0 01-.28-.34 2.64 2.64 0 01-.36-.66 2.91 2.91 0 01-.15-.58 2.999 2.999 0 01-.05-.42 3 3 0 01.09-.67c.1-.299.249-.58.44-.83a3 3 0 011.05-1H6zm4.93 7H4L1.81 7.16a.63.63 0 010-.62.61.61 0 01.52-.32h1.5a4.13 4.13 0 00-.24.83 3.71 3.71 0 00-.07.67 3.83 3.83 0 007.66 0c0-.516-.105-1.027-.31-1.5h2l-1.94 6z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Kitesurf'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.6 15.97l3.64-1.93-.48-.88-3.63 1.93zM11.64.5a7.81 7.81 0 00-3.41.91l-.53.28c-.01.01-.02.01-.03.02l-2.64 1.4a7.821 7.821 0 00-2.65 2.3 2.758 2.758 0 00.69 3.92l7.38 4.98 1.31-.69-5.99-6.47a1.741 1.741 0 01-.33-1.91c-.413.336-.785.72-1.107 1.144.039.35.16.687.355.982L3.25 8.13a1.563 1.563 0 01-.37-.79A1.731 1.731 0 013.18 6a7.9 7.9 0 016.03-3.08c.14-.005.28.002.42.02a1.74 1.74 0 011.55 1.35l2 8.57 1.32-.7V3.27a2.76 2.76 0 00-.84-1.99A2.865 2.865 0 0011.64.5zM5.328 8.158L9.04 12.15 4.1 8.82zM9.64 1.93a.684.684 0 00-.15 0 6.952 6.952 0 012.24-.43 1.742 1.742 0 011.67 1.232l-1.454.774A2.669 2.669 0 009.64 1.93zm3.86 7.88l-1.25-5.333 1.25-.664z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Skateboard'],
		icon: '<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><g fill=""><path d="M9.96.46c-.028.234-.083.632-.16 1.049a9.808 9.808 0 01-.183.817c-.072.258-.139.425-.187.502l-.004.006-6.081 10.27c-.155.255-.4.466-.663.641-.187.124-.328.198-.46.267-.076.04-.149.079-.225.124l.692.762c.15-.08.363-.198.545-.32.324-.214.704-.524.967-.958L10.28 3.355c.13-.208.226-.492.3-.761.08-.284.147-.603.203-.903l.048-.273z"></path><path clip-rule="evenodd" d="M11.384 6.968a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-1a.5.5 0 100-1 .5.5 0 000 1zm-4.53 8.702a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-1a.5.5 0 100-1 .5.5 0 000 1z" fill-rule="evenodd"></path></g></svg>'
	},
	{
		activityTypes: ['Snowshoe'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M14.56 1.61A3.507 3.507 0 008.5 4.23l.52 8.13a2.967 2.967 0 001.58 2.45l1.4.76 1.4-.75a2.989 2.989 0 001.58-2.45l.52-8.13a3.45 3.45 0 00-.94-2.63zM9.59 5.5h.92v2h-.8zm1.91 8.66l-.43-.23a1.964 1.964 0 01-1.05-1.63l-.24-3.8h.73v1.51a1.474 1.474 0 00.99 1.4zm0-10.57a1.43 1.43 0 00-.9.91H9.52l-.02-.33a2.464 2.464 0 01.67-1.88 2.427 2.427 0 011.33-.74zm.99 6.42a.49.49 0 01-.98 0V4.99a.49.49 0 11.98 0zm1.49 2.29a1.988 1.988 0 01-1.05 1.64l-.43.23v-2.76a1.474 1.474 0 00.99-1.4V8.5h.73zm.31-4.8h-.8v-2h.92zm.19-3H13.4a1.43 1.43 0 00-.9-.91V1.55c.511.098.978.357 1.33.74a2.463 2.463 0 01.67 1.88zM.5 4.23l.52 8.13a2.967 2.967 0 001.58 2.45l1.4.76 1.4-.75a2.988 2.988 0 001.58-2.45l.52-8.13A3.508 3.508 0 004 .5a3.458 3.458 0 00-2.56 1.11A3.426 3.426 0 00.5 4.23zM1.59 5.5h.92v2h-.8zm1.91 8.66l-.43-.23a1.964 1.964 0 01-1.05-1.63l-.24-3.8h.73v1.51a1.474 1.474 0 00.99 1.4zM6.29 7.5h-.8v-2h.92zM4.5 1.55c.511.098.978.357 1.33.74a2.464 2.464 0 01.67 1.88l-.02.33H5.4a1.43 1.43 0 00-.9-.91zm0 9.86a1.474 1.474 0 00.99-1.4V8.5h.73l-.24 3.8a1.988 1.988 0 01-1.05 1.64l-.43.23zM3.51 5.5v-.51a.49.49 0 01.98 0v5.02a.49.49 0 11-.98 0zM2.17 2.29a2.427 2.427 0 011.33-.74v2.04a1.43 1.43 0 00-.9.91H1.52l-.02-.33a2.464 2.464 0 01.67-1.88z" fill=""></path></svg>'
	},
	{
		activityTypes: ['StandUpPaddling'],
		icon: '<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M5.278 12.331a1.249 1.249 0 00-.778-1.007V2.5H5v-1H3v1h.5v8.87a1.23 1.23 0 00-.7.925l-.228 1.525a1.461 1.461 0 102.895.04l-.19-1.529zm-.915 2.013a.471.471 0 01-.7 0 .451.451 0 01-.106-.369l.23-1.525a.249.249 0 01.495.007l.189 1.531a.457.457 0 01-.108.356zM9.5 6.368a1.482 1.482 0 00-1.351 1.691c.102 1.255.402 2.487.887 3.649l.132.309h.668l.128-.309c.485-1.162.784-2.394.887-3.649A1.483 1.483 0 009.5 6.368zM9.5 10a7.45 7.45 0 01-.351-1.938c0-.587.245-.68.359-.69.05 0 .343.054.343.69A7.45 7.45 0 019.5 10z" fill=""></path><path d="M11.281 1.528a2.07 2.07 0 00-3.562 0A8.934 8.934 0 006.5 6.023c0 2.375.333 4.739.988 7.022l.484 1.683a1.076 1.076 0 001.036.773h.984a1.077 1.077 0 001.036-.772l.484-1.685c.655-2.283.988-4.646.988-7.021a8.934 8.934 0 00-1.219-4.495zm-.73 11.241L9.992 14.5l-1.059-.048-.484-1.684A24.465 24.465 0 017.5 6.023a7.935 7.935 0 011.083-3.992 1.072 1.072 0 011.834 0A7.944 7.944 0 0111.5 6.023c0 2.282-.32 4.553-.949 6.746z" fill=""></path></svg>'
	},
	{
		activityTypes: ['Swim'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g clip-path="url(#sports_water_normal_xsmall_svg__clip0_138_646)"><path d="M8 13.5a2.82 2.82 0 01-2.51-1.51h-1a2.823 2.823 0 01-2.5 1.51A2.779 2.779 0 010 12.69v1.26a3.743 3.743 0 001.99.55 3.822 3.822 0 003-1.45A3.8 3.8 0 008 14.5a3.742 3.742 0 003-1.46v-1.05h-.5A2.793 2.793 0 018 13.5zm3.51-6.51H10.5a2.833 2.833 0 01-5 0H4.49a2.8 2.8 0 01-2.5 1.5A2.813 2.813 0 010 7.69v1.25a3.743 3.743 0 001.99.55 3.762 3.762 0 003-1.45 3.849 3.849 0 006.02 0 3.845 3.845 0 004.99.9V7.69a2.85 2.85 0 01-4.49-.7zM11.52 2h-1.03A2.787 2.787 0 018 3.5 2.814 2.814 0 015.5 2H5v1.05a3.839 3.839 0 006.01 0 3.762 3.762 0 003 1.45A3.743 3.743 0 0016 3.95V2.69a2.78 2.78 0 01-1.99.81A2.8 2.8 0 0111.52 2z" fill=""></path></g><defs><clipPath id="sports_water_normal_xsmall_svg__clip0_138_646"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>'
	},
	{
		activityTypes: ['Wheelchair'],
		icon: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M4 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-2a.5.5 0 110 1 .5.5 0 010-1z" fill=""></path><path d="M4 11.5c.913 0 1.79-.36 2.442-1h5.336a2 2 0 10.236-2.326l-2.3-1.213a.4.4 0 01-.214-.353V6h-1v.607c.003.328.122.644.336.892H7.449a3.493 3.493 0 10-3.45 4.001zm9.5-3a1 1 0 110 2 1 1 0 010-2zm-6.051 0h3.015l1.088.56a1.987 1.987 0 00-.052.44H7.149a3.44 3.44 0 00.3-1zm-3.45-3a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" fill=""></path></svg>'
	}
];

export function getActivityIconURL(activityType: string) {
	for (const activityIcon of activityIconPairs) {
		if (activityIcon.activityTypes.includes(activityType)) {
			return activityIcon.icon;
		}
	}
	// Return the icon for eliptical/workout.
	return '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M15 3.5h-3.187a1.767 1.767 0 00-1.564.94s-.79 1.537-.83 1.56a.112.112 0 01-.12 0c-.04-.025-2.383-4.483-2.383-4.483a1.1 1.1 0 00-1.873 0L4.2 3.092a.772.772 0 01-.682.41H1.01v1h2.51a1.772 1.772 0 001.566-.94s.8-1.552.836-1.574a.1.1 0 01.107 0c.036.021 2.384 4.483 2.384 4.483a1.07 1.07 0 001.888 0l.83-1.563a.77.77 0 01.68-.409H15V3.5z" fill=""></path><path d="M15 7.488h-3.188a1.767 1.767 0 00-1.564.94s-.79 1.538-.831 1.562a.107.107 0 01-.121 0C9.255 9.966 6.91 5.506 6.91 5.506a1.1 1.1 0 00-1.873 0L4.2 7.08a.769.769 0 01-.681.41H1.008v1H3.52a1.767 1.767 0 001.564-.94s.8-1.552.837-1.574a.1.1 0 01.107 0C6.064 6 8.413 10.46 8.413 10.46a1.07 1.07 0 001.887 0l.83-1.56a.77.77 0 01.682-.409H15V7.488z" fill=""></path><path d="M10.248 12.443s-.79 1.537-.831 1.562a.111.111 0 01-.121 0C9.255 13.98 6.91 9.521 6.91 9.521a1.1 1.1 0 00-1.873 0L4.2 11.1a.77.77 0 01-.681.409H1.008v1H3.52a1.766 1.766 0 001.564-.94s.8-1.552.837-1.573a.1.1 0 01.107 0c.036.021 2.385 4.483 2.385 4.483a1.068 1.068 0 001.887 0l.83-1.563a.77.77 0 01.682-.409H15v-1h-3.188a1.768 1.768 0 00-1.564.936z" fill=""></path></svg>';
}

export function getCommuteIconURL(isCommute: boolean) {
	return isCommute
		? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M176 56V96H336V56c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zM128 96V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96v32V480H128V128 96zM64 96H96V480H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64zM448 480H416V96h32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64z"/></svg>'
		: '';
}
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};