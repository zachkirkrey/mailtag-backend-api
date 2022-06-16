// public function send($service, $userId) {
//     try {
//         $message = $service -> users_messages -> send($service, $userId);
//         return $message;
//     } catch (\Exception $e) {
//         error_log('An error occurred: '.$e -> getMessage());
//         throw $e;
//     }
// }

// public function createDraft($service, $userId, $message) {
//     $draft = new \Google_Service_Gmail_Draft();
//     $draft -> setMessage($message);
//     try {
//         $draft = $service -> users_drafts -> create($userId, $draft);
//         return $draft;
//     } catch (\Exception $e) {
//         error_log('An error occurred: '.$e -> getMessage());
//         throw $e;
//     }
// }

// public function createMessage($email, $messageId, $threadId) {
//     $message = new \Google_Service_Gmail_Message();
//     // base64url encode the string
//     $email = strtr(base64_encode($email), array('+' => '-', '/' => '_'));
//     $message -> setRaw($email);
//     $message -> setId($messageId);
//     $message -> setThreadId($threadId);
//     return $message;
// }

// public function hasReplied($service, $threadId, $email) {
//     $hasRepliedFlag = false;
//     try {
//         $thread = $service -> users_threads -> get($email, $threadId, array(
//             'format' => 'metadata', 'metadataHeaders' => ['From', 'To']));
//         $messages = $thread -> getMessages();
//         $msgCount = newCount($messages);
//         $lastMessage = $messages[$msgCount - 1];
//         $payLoad = $lastMessage -> getPayload();
//         $headers = $payLoad -> getHeaders();
//         if (!empty($headers)) {
//             foreach($headers as $key => $value) {
//                 if (preg_match('/From/i', $headers[$key] -> getName())) {
//                     if (preg_match('/'.$email. '/i', $headers[$key] -> getValue())) {
//                         $hasRepliedFlag = false;
//                     } else {
//                         $hasRepliedFlag = true;
//                     }
//                 }
//             }
//         }
//     } catch (\Exception $e) {
//         error_log('An error occurred: '.$e -> getMessage());
//         throw $e;
//     }
//     return $hasRepliedFlag;
// }
// }
