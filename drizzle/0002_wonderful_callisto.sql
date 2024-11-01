-- manually changed
CREATE TABLE IF NOT EXISTS `Guild` (
	`id` integer PRIMARY KEY NOT NULL,
	`agreedWithTerms` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `__new_LikeMeme` (
	`id` integer PRIMARY KEY NOT NULL,
	`author_id` integer NOT NULL,
	`meme_id` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`meme_id`) REFERENCES `Meme`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_LikeMeme`("id", "author_id", "meme_id") SELECT "id", "author_id", "meme_id" FROM `LikeMeme`;--> statement-breakpoint
DROP TABLE `LikeMeme`;--> statement-breakpoint
ALTER TABLE `__new_LikeMeme` RENAME TO `LikeMeme`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `__new_Meme` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(150) NOT NULL,
	`extension` text(4) NOT NULL,
	`full_name` text(154) NOT NULL,
	`author_id` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_Meme`("id", "name", "extension", "full_name", "author_id") SELECT "id", "name", "extension", "full_name", "authorId" FROM `Meme`;--> statement-breakpoint
DROP TABLE `Meme`;--> statement-breakpoint
ALTER TABLE `__new_Meme` RENAME TO `Meme`;--> statement-breakpoint
CREATE UNIQUE INDEX `Meme_full_name_unique` ON `Meme` (`full_name`);