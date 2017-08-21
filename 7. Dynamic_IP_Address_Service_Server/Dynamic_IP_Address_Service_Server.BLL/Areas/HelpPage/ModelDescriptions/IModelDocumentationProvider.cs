using System;
using System.Reflection;

namespace Dynamic_IP_Address_Service_Server.BLL.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}