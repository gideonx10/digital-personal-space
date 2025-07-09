export default function Footer() {
  return (
    <footer className="w-full border-t p-4 text-center text-sm text-muted-foreground bg-white mt-10">
      © {new Date().getFullYear()} Digital Diary by Adi. All rights reserved.
    </footer>
  );
}
