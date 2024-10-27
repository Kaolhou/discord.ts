ALTER TABLE `users` RENAME TO `User`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_LikeMeme` (
	`id` integer PRIMARY KEY NOT NULL,
	`authorId` integer NOT NULL,
	`memeId` integer NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`memeId`) REFERENCES `Meme`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_LikeMeme`("id", "authorId", "memeId") SELECT "id", "authorId", "memeId" FROM `LikeMeme`;--> statement-breakpoint
DROP TABLE `LikeMeme`;--> statement-breakpoint
ALTER TABLE `__new_LikeMeme` RENAME TO `LikeMeme`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_Meme` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(150) NOT NULL,
	`extension` text(4) NOT NULL,
	`full_name` text(154) NOT NULL,
	`authorId` integer NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_Meme`("id", "name", "extension", "full_name", "authorId") SELECT "id", "name", "extension", "full_name", "authorId" FROM `Meme`;--> statement-breakpoint
DROP TABLE `Meme`;--> statement-breakpoint
ALTER TABLE `__new_Meme` RENAME TO `Meme`;--> statement-breakpoint
CREATE UNIQUE INDEX `Meme_full_name_unique` ON `Meme` (`full_name`);