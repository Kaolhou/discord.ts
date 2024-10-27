CREATE TABLE `LikeMeme` (
	`id` integer PRIMARY KEY NOT NULL,
	`authorId` integer NOT NULL,
	`memeId` integer NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`memeId`) REFERENCES `Meme`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Meme` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(150) NOT NULL,
	`extension` text(4) NOT NULL,
	`full_name` text(154) NOT NULL,
	`authorId` integer NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Meme_full_name_unique` ON `Meme` (`full_name`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL
);
