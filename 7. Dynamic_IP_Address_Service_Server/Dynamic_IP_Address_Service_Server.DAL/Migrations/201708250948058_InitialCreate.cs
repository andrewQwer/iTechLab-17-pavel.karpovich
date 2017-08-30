namespace Dynamic_IP_Address_Service_Server.DAL.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Domains",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Ip = c.String(nullable: false, maxLength: 15),
                    DomainName = c.String(nullable: false, maxLength: 128),
                    CreatedAt = c.DateTime(),
                    CreatedBy = c.String(maxLength: 128),
                    ModifiedAt = c.DateTime(),
                    ModifiedBy = c.String(maxLength: 128),
                    User_Id = c.Guid(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);

            CreateTable(
                "dbo.Users",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Login = c.String(nullable: false, maxLength: 64),
                    Email = c.String(nullable: false, maxLength: 128),
                    FirstName = c.String(nullable: false, maxLength: 128),
                    LastName = c.String(nullable: false, maxLength: 128),
                    IsInBin = c.Boolean(nullable: false),
                    Salt = c.String(nullable: false, maxLength: 128),
                    Hash = c.String(nullable: false, maxLength: 1024),
                    CreatedAt = c.DateTime(),
                    CreatedBy = c.String(maxLength: 128),
                    ModifiedAt = c.DateTime(),
                    ModifiedBy = c.String(maxLength: 128),
                    Role_Id = c.Guid(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Roles", t => t.Role_Id)
                .Index(t => t.Role_Id);

            CreateTable(
                "dbo.Roles",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    Name = c.String(nullable: false, maxLength: 64),
                    DomainCount = c.Int(nullable: false),
                    CreatedAt = c.DateTime(),
                    CreatedBy = c.String(maxLength: 128),
                    ModifiedAt = c.DateTime(),
                    ModifiedBy = c.String(maxLength: 128),
                })
                .PrimaryKey(t => t.Id);
        }

        public override void Down()
        {
            DropForeignKey("dbo.Users", "Role_Id", "dbo.Roles");
            DropForeignKey("dbo.Domains", "User_Id", "dbo.Users");
            DropIndex("dbo.Users", new[] { "Role_Id" });
            DropIndex("dbo.Domains", new[] { "User_Id" });
            DropTable("dbo.Roles");
            DropTable("dbo.Users");
            DropTable("dbo.Domains");
        }
    }
}