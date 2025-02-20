import track from '@codesandbox/common/lib/utils/analytics';
import { MessageStripe } from '@codesandbox/components';
import { Link } from 'react-router-dom';
import React from 'react';
import { useActions } from 'app/overmind';

const getEventName = (isEligibleForTrial: boolean) =>
  isEligibleForTrial
    ? 'Limit banner: create sandbox - Start trial'
    : 'Limit banner: create sandbox - Upgrade';

const EVENT_PROPS = {
  codesandbox: 'V1',
  event_source: 'UI',
};

type MaxPublicReposProps = {
  checkoutUrl?: string;
  isTeamAdmin: boolean;
  isEligibleForTrial: boolean;
};
export const MaxPublicSandboxes: React.FC<MaxPublicReposProps> = ({
  checkoutUrl,
  isEligibleForTrial,
  isTeamAdmin,
}) => {
  const { newSandboxModal } = useActions().modals;

  return (
    <MessageStripe justify="space-between">
      You&apos;ve reached the maximum amount of free sandboxes. Upgrade for
      more.
      {isTeamAdmin ? (
        <MessageStripe.Action
          {...(checkoutUrl
            ? {
                as: 'a',
                href: checkoutUrl,
              }
            : {
                as: Link,
                to: '/pro',
              })}
          onClick={() => {
            if (!checkoutUrl) {
              newSandboxModal.close();
            }
            track(getEventName(isEligibleForTrial), EVENT_PROPS);
          }}
        >
          {isTeamAdmin ? 'Upgrade now' : 'Learn more'}
        </MessageStripe.Action>
      ) : (
        <MessageStripe.Action
          onClick={() =>
            track('Limit banner: create sandbox - Learn more', EVENT_PROPS)
          }
        >
          Learn more
        </MessageStripe.Action>
      )}
    </MessageStripe>
  );
};
