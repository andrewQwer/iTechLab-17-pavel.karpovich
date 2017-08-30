namespace Dynamic_IP_Address_Service_Server.DAL.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class addtokentable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tokens",
                c => new
                {
                    Id = c.Guid(nullable: false, identity: true),
                    AuthToken = c.String(nullable: false, maxLength: 128),
                    CreatedAt = c.DateTime(),
                    CreatedBy = c.String(maxLength: 128),
                    ModifiedAt = c.DateTime(),
                    ModifiedBy = c.String(maxLength: 128),
                    User_Id = c.Guid(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);
        }

        public override void Down()
        {
            DropForeignKey("dbo.Tokens", "User_Id", "dbo.Users");
            DropIndex("dbo.Tokens", new[] { "User_Id" });
            DropTable("dbo.Tokens");
        }
    }
}