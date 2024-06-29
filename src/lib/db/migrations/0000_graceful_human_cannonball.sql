CREATE TABLE IF NOT EXISTS "config" (
	"name" text,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" integer,
	"userName" text,
	"createdAt" timestamp DEFAULT now()
);
