using System;
using System.Collections.Generic;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using EPiServer.Shell.ObjectEditing;

namespace EpiserverLabSite.Business.EditorDescriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(String), UIHint = "RowLayoutPicker")]
    public class RowLayoutPickerEditorDescriptor : EditorDescriptor
    {
        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            ClientEditingClass = "alloy/editors/RowLayoutPicker";
            base.ModifyMetadata(metadata, attributes);
        }
    }
}