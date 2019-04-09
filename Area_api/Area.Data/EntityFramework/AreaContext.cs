using Microsoft.EntityFrameworkCore;
using Area.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Area.Data.EntityFramework
{
    public class AreaContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public AreaContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Service> Services { get; set; }
        public DbSet<Applet> Applets { get; set; }
        public DbSet<Souscription> Souscriptions { get; set; }
        // Fluent API to put a composite primary key
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var user = modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers");
            var role = modelBuilder.Entity<ApplicationRole>().ToTable("AspNetRoles");
            var login = modelBuilder.Entity<ApplicationUserLogin>().ToTable("AspNetUsersLogin");

            user.Property(u => u.UserName).IsRequired();
            role.Property(r => r.Name).IsRequired();
        }
    }
}
