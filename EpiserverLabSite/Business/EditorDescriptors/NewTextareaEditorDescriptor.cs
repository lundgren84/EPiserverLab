using System;
using System.Collections.Generic;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using EPiServer.Shell.ObjectEditing;

namespace EpiserverLabSite.Business.EditorDescriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(String), UIHint = "NewTextarea")]
    public class NewTextareaEditorDescriptor : EditorDescriptor
    {
        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            ClientEditingClass = "alloy/editors/NewTextarea";
            base.ModifyMetadata(metadata, attributes);
        }
    }
}